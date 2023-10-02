const { Sequelize, DataTypes } = require('sequelize');
const timeFormat = require('../../Services/Time');

const sequelize = new Sequelize('shopee', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

const User = sequelize.define('users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        validate: {
            isNumeric: true,
        },
    },
    password: {
        type: DataTypes.STRING,
    },
    avatar: {
        type: DataTypes.STRING,
        get() {
            const avatar = this.getDataValue('avatar');
            return avatar;
        },
    },
    createAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updateAt: {
        type: DataTypes.DATE,
    },
    createAtStr: {
        type: DataTypes.VIRTUAL,
        get() {
            const time = this.getDataValue('createAt');
            if (time != null) return timeFormat(time);
            else {
                return time;
            }
        },
    },
    updateAtStr: {
        type: DataTypes.VIRTUAL,
        get() {
            const time = this.getDataValue('updateAt');
            if (time != null) return timeFormat(time);
            else {
                return time;
            }
        },
    },
});

const Access = sequelize.define('accesses', {
    accessId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    accessName: {
        type: DataTypes.STRING,
    },
});

const Category = sequelize.define('categories', {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        get() {
            const icon = this.getDataValue('icon');
            return `/uploads/images/typegoods/${icon}`;
        },
    },
});

const Product = sequelize.define(
    'products',
    {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER,
        },
        createAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIME'),
        },
        updateAt: {
            type: DataTypes.DATE,
        },

        createAtStr: {
            type: DataTypes.VIRTUAL,
            get() {
                const time = this.getDataValue('createAt');
                return timeFormat(time);
            },
        },
        updateAtStr: {
            type: DataTypes.VIRTUAL,
            get() {
                const time = this.getDataValue('updateAt');
                if (time != null) {
                    return timeFormat(time);
                }
            },
        },
    },
    {
        paranoid: true,
    },
);

const Comment = sequelize.define(
    'comments',
    {
        commentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
        },
        createAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIME'),
        },
        updateAt: {
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
    },
);

const Cart = sequelize.define('carts', {
    cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
});

const ProductCart = sequelize.define('productCart', {
    productCartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    currentPrice: {
        type: DataTypes.BIGINT,
    },
});

const Bill = sequelize.define(
    'bills',
    {
        billId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.BIGINT,
        },
        createAt: {
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
    },
);

const Order = sequelize.define('orders', {
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIME'),
    },
    cancelAt: {
        type: DataTypes.DATE,
    },
});

const Image = sequelize.define('images', {
    imageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    path: {
        type: DataTypes.STRING,
        get() {
            const path = this.getDataValue('path');
            return `/uploads/images/${path}`;
        },
    },
});

const Application = sequelize.define('applications', {
    applicationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIME'),
    },
    identification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bankAccountNumber: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.INTEGER,
    },
});

Access.hasMany(User, { onDelete: 'CASCADE' });
User.belongsTo(Access, { onDelete: 'CASCADE' });

User.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(User, { onDelete: 'CASCADE' });

Category.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(Category, { onDelete: 'CASCADE' });

User.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(User, { onDelete: 'CASCADE' });

Product.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Product, { onDelete: 'CASCADE' });

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: ProductCart });
Product.belongsToMany(Cart, { through: ProductCart });

User.hasMany(Bill);
Bill.belongsTo(User);

Bill.hasMany(Order);
Order.belongsTo(Bill);

ProductCart.hasOne(Order);
Order.belongsTo(ProductCart);

Product.hasMany(Image, { onDelete: 'CASCADE' });
Image.belongsTo(Product, { onDelete: 'CASCADE' });

User.hasMany(Application);
Application.belongsTo(User);

Category.hasMany(Application);
Application.belongsTo(Category);

module.exports = {
    User,
    Access,
    Category,
    Product,
    Comment,
    Image,
    ProductCart,
    Cart,
    Bill,
    Order,
    Application,
    sequelize,
};
