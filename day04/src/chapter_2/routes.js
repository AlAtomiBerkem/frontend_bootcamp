const { Router } = require('express');
const controller = require('./controller/controller.js');
const router = Router();

// GET /menu — клиент может посмотреть меню и все, что в него входит.
router.get('/menu', controller.getMenu);

// POST /orders — создать заказ.
router.post('/orders', controller.postOrders);

// PUT /orders/:id — изменить заказ
router.put('/orders/:id', controller.uppDateOrderId);

// DELETE /orders/:id — закрыть заказ (для закрытия советуем не удалять запись из таблицы, а просто изменять одно из полей с true на false).
router.delete('/orders/:id', controller.closeOrder);

// GET /orders — получить все текущие заказы из ресторана.
router.get('/orders', controller.getOrder);

// POST /waiters —  возможность добавить нового сотрудника
router.post('/waiters', controller.createWaiter);

module.exports = router;
