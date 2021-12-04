package middlewares

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"strconv"
)

func IsAuthenticated(c *fiber.Ctx) error {
	token, err := getToken(c)

	if err != nil || !token.Valid {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	return c.Next()
}

func GetUser(c *fiber.Ctx) (uint, error) {
	token, err := getToken(c)
	if err != nil {
		return 0, err
	}
	payload := token.Claims.(*jwt.StandardClaims)
	id, _ := strconv.Atoi(payload.Subject)
	return uint(id), nil
}

func getToken(c *fiber.Ctx) (*jwt.Token, error) {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	return token, err
}
