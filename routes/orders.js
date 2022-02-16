const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const idlength = 8;

/**
 *  @swagger
 *  tags:
 *    name: Orders
 *    description: API заказов.
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - date
 *          - size
 *          - dough
 *          - sauce
 *          - cheese
 *          - meat
 *          - vegetables
 *          - address
 *          - name
 *          - card_number
 *          - price
 *        properties:
 *          id:
 *            type: string
 *            description: Автоматический сгенерированный ID заказа
 *          date:
 *            type: string
 *            description: Дата создания заказа
 *          size:
 *            type: number
 *            description: Размер пиццы
 *          dough:
 *            type: string
 *            description: Тип теста
 *          sauce:
 *            type: string
 *            description: Тип соуса
 *          cheese:
 *            type: array
 *            items: string
 *            description: Массив с slug - сыров
 *          meat:
 *            type: array
 *            items: string
 *            description: Массив с slug - мяса
 *          vegetables:
 *            type: array
 *            items: string
 *            description: Массив с slug - овощей
 *          address:
 *            type: string
 *            description: Адрес заказа
 *          name:
 *            type: string
 *            description: Имя заказчика
 *          card_number:
 *            type: string
 *            description: Номер карты
 *          price:
 *            type: number
 *            description: Цена заказа
 *        example:
 *           date: 22 октября 2020, 9:40
 *           size: 30
 *           dough: thick
 *           sauce: mayo
 *           cheese:
 *             - cheddar
 *           meat:
 *             - salami
 *             - bacon
 *           vegetables:
 *             - olives
 *             - onion
 *             - pepper
 *           address: Sesame Street *
 *           name: Ivan Ivanov
 *           card_number: 0000 0000 0000 0000
 *           price: 600
 */

/**
 * @swagger
 * /v1/orders:
 *   get:
 *     tags: [Orders]
 *     Summary: Показать все заказы
 *     responses:
 *       200:
 *         description: Список заказов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *
 */
router.get("/", (req, res) => {
  const orders = req.app.db.get("orders");
  res.send(orders);
});

/**
 * @swagger
 * /v1/orders:
 *   post:
 *     tags: [Orders]
 *     description: Создать новый заказ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Заказ оформлен успешно
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Ошибка на сервере
 *
 */
router.post("/", (req, res) => {
  try {
    const {
      date,
      size,
      dough,
      sauce,
      cheese,
      meat,
      vegetables,
      address,
      name,
      card_number,
      price,
    } = req.body;

    const newOrder = {
      id: nanoid(idlength),
      date,
      size,
      dough,
      sauce,
      cheese,
      meat,
      vegetables,
      address,
      name,
      card_number,
      price,
    };

    req.app.db.get("orders").push(newOrder).write();

    return res.send(newOrder);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
