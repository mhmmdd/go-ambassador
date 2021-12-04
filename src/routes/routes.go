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

}
