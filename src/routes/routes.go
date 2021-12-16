package routes

import (
	"ambassador/src/controllers"
	"ambassador/src/middlewares"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("api")
	admin := api.Group("admin")

	admin.Post("register", controllers.Register)
	admin.Post("login", controllers.Login)

	authenticated := admin.Use(middlewares.IsAuthenticated)
	authenticated.Get("user", controllers.User)
	authenticated.Post("logout", controllers.Logout)
	authenticated.Put("users/info", controllers.UpdateInfo)
	authenticated.Put("users/password", controllers.UpdatePassword)

	authenticated.Get("ambassadors", controllers.Ambassadors)
	// Products
	authenticated.Get("products", controllers.Products)
	authenticated.Post("products", controllers.CreateProducts)
	authenticated.Get("products/:id", controllers.GetProduct)
	authenticated.Put("products/:id", controllers.UpdateProduct)
	authenticated.Delete("products/:id", controllers.DeleteProduct)
	// Link
	authenticated.Get("users/:id/links", controllers.Link)
	// Order
	authenticated.Get("orders", controllers.Orders)

	// Ambassador
	ambassador := api.Group("ambassador")
	ambassador.Post("register", controllers.Register)
	ambassador.Post("login", controllers.Login)
	ambassador.Get("products/frontend", controllers.ProductFrontend)

	ambassadorAuthenticated := ambassador.Use(middlewares.IsAuthenticated)
	ambassadorAuthenticated.Get("user", controllers.User)
	ambassadorAuthenticated.Post("logout", controllers.Logout)
	ambassadorAuthenticated.Put("users/info", controllers.UpdateInfo)
	ambassadorAuthenticated.Put("users/password", controllers.UpdatePassword)

}
