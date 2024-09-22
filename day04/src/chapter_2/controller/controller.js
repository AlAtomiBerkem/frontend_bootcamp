const { MenuItem, Order, User } = require('../sequelize//models/index.js');
//получить меню
const getMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    console.log(menuItems);
    res.status(201).json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении данных меню' });
  }
};
// получить список всез заказов
const getOrder = async (req, res) => {
  try {
    const orders = await Order.findAll();
    console.log(orders);
    res.status(201).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось получить список заказов' });
  }
};
// создать новый заказ
const postOrders = async (req, res) => {
  try {
    const { items, userId, isActive } = req.body;
    const createOrder = await Order.create({ items, userId, isActive });
    console.log(createOrder);
    res.status(201).json(createOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при создании нового заказа' });
  }
};

// изменить заказ.
const uppDateOrderId = async (req, res) => {
  try {
    const { items, isActive } = req.body;
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    if (isActive === false) {
      return res.status(400).json({ error: 'Заказ завершен и не может быть изменен' });
    }

    await order.update({ items, isActive });
    console.log(order);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось изменить заказ' });
  }
};
// закрыть заказ
const closeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    if (order.isActive === false) {
      return res.status(400).json({ error: 'Заказ уже закрыт' });
    }

    order.isActive = false;
    await order.save();
    console.log(order);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось закрыть заказ' });
  }
};

// POST /waiters —  возможность добавить нового сотрудника
const createWaiter = async (req, res) => {
  try {
    const { name, orders, role } = req.body;
    const waiter = await User.create({ name, orders, role });

    console.log(waiter);
    res.status(201).json(waiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не получилось добавить нового сотрудника' });
  }
};

module.exports = {
  getMenu,
  getOrder,
  postOrders,
  uppDateOrderId,
  closeOrder,
  createWaiter 
};