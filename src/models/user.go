package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	Model
	FirstName    string  `json:"first_name"`
	LastName     string  `json:"last_name"`
	Email        string  `json:"email" gorm:"uniqueIndex"`
	Password     []byte  `json:"-"` // omit
	IsAmbassador bool    `json:"-"`
	Revenue      float64 `json:"revenue,omitempty" gorm:"-"`
}

func (user *User) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 12)
	user.Password = hashedPassword
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}

//type Revenue interface {
//	CalculateRevenue()
//}

type Admin User

type Ambassador User

func (admin *Admin) CalculateRevenue(db *gorm.DB) {
	var orders []Order
	db.Preload("OrderItems").Find(&orders, &Order{
		UserId:   admin.Id,
		Complete: true,
	})

	var revenue float64 = 0

	for _, order := range orders {
		for _, orderItem := range order.OrderItems {
			revenue += orderItem.AdminRevenue
		}
	}
	admin.Revenue = revenue
}

func (ambassador *Ambassador) CalculateRevenue(db *gorm.DB) {
	var orders []Order
	db.Preload("OrderItems").Find(&orders, &Order{
		UserId:   ambassador.Id,
		Complete: true,
	})

	var revenue float64 = 0

	for _, order := range orders {
		for _, orderItem := range order.OrderItems {
			revenue += orderItem.AmbassadorRevenue
		}
	}
	ambassador.Revenue = revenue
}
