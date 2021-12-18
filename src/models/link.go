package models

type Link struct {
	Model
	Code    string    `json:"code"`
	UserId  uint      `json:"userId"`
	User    User      `json:"user" gorm:"foreignKey:UserId"`           // oneToMany
	Products []Product `json:"products" gorm:"many2many:link_products"` // manyToMany
	Orders  []Order   `json:"orders" gorm:"-"`
}
