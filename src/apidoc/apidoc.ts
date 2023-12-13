/**
 * @api {post} /api/auth/login Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 *
 * @apiSuccess {UserLoginResponse} login response object
 */

/**
 * @api {get} /api/auth/me Get current user
 * @apiName GetCurrentUser
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {User} user
 */

/**
 * @api {get} /api/cart Get cart
 * @apiName GetCart
 * @apiGroup Cart
 *
 * @apiSuccess {Cart} cart
 */

/**
 * @api {post} /api/cart Add item to cart
 * @apiName AddToCart
 * @apiGroup Cart
 *
 * @apiParam {MenuItem} item
 *
 * @apiSuccess {Cart} cart
 */

/**
 * @api {delete} /api/cart/:id Delete item from cart
 * @apiName DeleteFromCart
 * @apiGroup Cart
 *
 * @apiParam {Number} id Item id
 *
 * @apiSuccess {Cart} cart
 */

/**
 * @api {get} /api/menu Get menu
 * @apiName GetMenu
 * @apiGroup Menu
 *
 * @apiSuccess {MenuItem[]} menu
 */

/**
 * @api {post} /api/menu Add menu item
 * @apiName AddMenuItem
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {String} name
 * @apiParam {String} description
 * @apiParam {Number} price
 * @apiParam {Number} category
 *
 * @apiSuccess {MenuItem} menuItem
 */

/**
 * @api {put} /api/menu/:id Update menu item
 * @apiName UpdateMenuItem
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id Item id
 * @apiParam {String} name
 * @apiParam {String} description
 * @apiParam {Number} price
 * @apiParam {Number} category
 *
 * @apiSuccess {MenuItem} menuItem
 */

/**
 * @api {delete} /api/menu/:id Delete menu item
 * @apiName DeleteMenuItem
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id Item id
 *
 * @apiSuccess {MenuItem} menuItem
 */

/**
 * @api {get} /api/order Get orders
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Order[]} orders
 */

/**
 * @api {post} /api/order Create order
 * @apiName CreateOrder
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Order} order
 */

/**
 * @api {get} /api/order/:id Get order
 * @apiName GetOrder
 * @apiGroup Orders
 *
 * @apiParam {Number} id Order id
 *
 * @apiSuccess {Order} order
 */

/**
 * @api {patch} /api/order/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id Order id
 * @apiParam {OrderStatus} order_status
 *
 * @apiSuccess {Order} order
 */

/**
 * @api {post} /api/user Create user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiParam {String} first_name
 * @apiParam {String} last_name
 * @apiParam {String} email
 * @apiParam {String} phone
 * @apiParam {String} address
 *
 * @apiSuccess {User} user
 */

/**
 * @api {get} /api/user/:id Get user
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id User id
 *
 * @apiSuccess {User} user
 */

/**
 * @api {put} /api/user/:id Update user
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id User id
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiParam {String} first_name
 * @apiParam {String} last_name
 * @apiParam {String} email
 * @apiParam {String} phone
 * @apiParam {String} address
 *
 * @apiSuccess {User} user
 */

/**
 * @api {delete} /api/user/:id Delete user
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id User id
 */

/**
 * @api {get} /api/user/:id/orders Get user orders
 * @apiName GetUserOrders
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id User id
 *
 * @apiSuccess {Order[]} orders
 */
