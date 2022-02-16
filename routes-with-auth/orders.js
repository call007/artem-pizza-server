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
 *          size:
 *            type: number
 *            description: Размер пиццы
 *          dough:
 *            type: string
 *            description: Тип теста
 *          sauce:
 *            type: string
 *            description: Тип соуса
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
 *           id: d5fE_asz
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
 *           size: 30
 *           dough: thick
 *           name: Ivan Ivanov
 *           card_number: 0000 0000 0000 0000
 *           price: 600
 *           address: Sesame Street
 */

/**
 * @swagger
 * /v2/orders:
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
 * /v2/orders:
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
      size,
      name,
      cheese,
      meat,
      vegetables,
      dough,
      sauce,
      address,
      card_number,
      price,
    } = req.body;

    const newOrder = {
      id: nanoid(idlength),
      name,
      address,
      card_number,
      size,
      dough,
      sauce,
      cheese,
      meat,
      vegetables,
      price,
    };

    req.app.db.get("orders").push(newOrder).write();

    return res.send(newOrder);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
