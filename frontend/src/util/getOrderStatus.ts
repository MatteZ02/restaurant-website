export enum OrderStatus {
    Pending = 1,
    Accepted = 2,
    Rejected = 3,
    Delivered = 4,
}

const getOrderStatus = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Accepted:
            return "Accepted";
        case OrderStatus.Delivered:
            return "Delivered";
        case OrderStatus.Pending:
            return "Pending";
        case OrderStatus.Rejected:
            return "Rejected";
    }
};

export default getOrderStatus;
