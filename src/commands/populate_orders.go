package main

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"github.com/bxcodec/faker/v3"
	"math/rand"
)

func main() {
	database.Connect()
	for i := 0; i < 30; i++ {
		var orderItem []models.OrderItem

		for j := 0; j < rand.Intn(5); j++ {
			price := float64(rand.Intn(90) + 10)
			quantity := uint(rand.Intn(5))
			orderItem = append(orderItem, models.OrderItem{
				ProductTitle:      faker.Word(),
				Price:             price,
				Quantity:          quantity,
				AdminRevenue:      0.9 * price * float64(quantity),
				AmbassadorRevenue: 0.1 * price * float64(quantity),
			})
			database.DB.Create(&models.Order{
				UserId:          uint(rand.Intn(30) + 1),
				Code:            faker.Username(),
				AmbassadorEmail: faker.Email(),
				FirstName:       faker.FirstName(),
				LastName:        faker.LastName(),
				Email:           faker.Email(),
				Complete:        true,
				OrderItems:      orderItem,
			})
		}
	}
}
