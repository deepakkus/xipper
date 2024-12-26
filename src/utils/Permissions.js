const permissions = {

    CAN_ACCESS_HOMEPAGE: { SuperAdmin: true, Admin: true, Employee: true },

    CAN_ACCESS_DASHBOARD: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_RECEPTION: { SuperAdmin: true, Admin: true, Employee: false },

    CAN_ACCESS_MANAGEMENT: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_MANAGEMENT_MEMBER_DETAILS: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_MANAGEMENT_GROUP_PERMISSIONS: { SuperAdmin: true, Admin: true, Employee: false },
    CAN_ACCESS_MANAGEMENT_INVITE_USER: { SuperAdmin: true, Admin: true, Employee: true },

    CAN_ACCESS_MANAGEMENT_CREATE_GROUP: { SuperAdmin: true, Admin: true, Employee: true },

    CAN_ACCESS_ACCOUNTS: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_ACCOUNTS_PROFILE: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_ACCOUNTS_FAMILY: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_ACCOUNTS_ADDRESS: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_ACCOUNTS_PHONE: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_ACCOUNTS_EMAIL: { SuperAdmin: true, Admin: true, Employee: true },

    CAN_ACCESS_ACCOUNTS_CREDIT_CARD :{ SuperAdmin: true, Admin: true, Employee: false },
    CAN_ACCESS_ACCOUNTS_DEBIT_CARD :{ SuperAdmin: true, Admin: true, Employee: false },
    CAN_ACCESS_ACCOUNTS_UPI :{ SuperAdmin: true, Admin: true, Employee: false },
    CAN_ACCESS_ACCOUNTS_BANK :{ SuperAdmin: true, Admin: true, Employee: false },

    CAN_ACCESS_ACCOUNTS_GOVERNMENT_ID : { SuperAdmin: true, Admin: true, Employee: false},

    CAN_ACCESS_BOOKING: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_CATALOGUE: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_SEARCH: { SuperAdmin: true, Admin: true, Employee: false },
    CAN_ACCESS_SETTINGS: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_INBOX: { SuperAdmin: true, Admin: true, Employee: false },
    CAN_ACCESS_ORDERS: { SuperAdmin: true, Admin: true, Employee: false },
    CAN_ACCESS_CUSTOMERS: { SuperAdmin: true, Admin: true, Employee: true },
    CAN_ACCESS_ANALYTICS: { SuperAdmin: true, Admin: true, Employee : false },
    CAN_ACCESS_REVIEWS: { SuperAdmin: true, Admin: true, Employee: false },
    CAN_ACCESS_OFFERS: { SuperAdmin: true, Admin: true, Employee: false },
    CAN_REGISTER_SELLER: { SuperAdmin: true, Admin: true, Employee: false },

    CAN_ACCESS_COMPANY_REGISTRATION : { SuperAdmin: true, Admin: true, Employee: true },

    CAN_ACCESS_TEST :  { SuperAdmin: true, Admin: true, Employee: true },

    
    CAN_ACCESS_COMPANY_ANALYTICS: { SuperAdmin: true, Admin: true, Employee: false },
    CAN_ACCESS_NOT_FOUND: { SuperAdmin: true, Admin: true, Employee: true }

};

export default permissions;
