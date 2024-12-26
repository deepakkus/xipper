export const formatDate = (date) => {
    if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return date;
};

export const DateFormatLong = (dateString, month = "long") => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: month, year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};
export const DateFormatLongWithoutYear = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
};


export const getInitials = (name) => {
    if (!name) return '';

    const nameArray = name.split(' ');
    const initials = nameArray.map(word => word.charAt(0).toUpperCase()).join('');

    return initials;
};

export const maskNumber = (number, type) => {
    if (!number) return '';

    switch (type) {
        case 'pan':
            return 'XXXXXXXX' + number.slice(-2);

        case 'aadhaar':
            return 'XXXXXXXX' + number.slice(-4)

        case 'passport':
            return number.slice(0, 2) + 'XXXXXXXXXXX'

        case 'dl':
            return number.slice(0, 4) + 'XXXXXXXXXXX'

        default:
            return number;
    }
}

export const getTimeDifference = (dateString) => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    const timeDifference = currentDate - targetDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;

    let result = '';

    if (days > 0) {
        result += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (remainingHours > 0) {
        result += `${remainingHours} hr${remainingHours > 1 ? 's' : ''} `;
    }
    if (remainingMinutes > 0) {
        result += `${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''}`;
    }

    if (result === '') {
        result = 'Just now';
    }

    return result.trim();
};
export function convertTo24HourFormat(time) {
    const [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
        hours += 12;
    } else if (period === "AM" && hours === 12) {
        hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}


export const extractUniqueCategoryAndItemTypes = (data) => {
    const categoryMap = new Map();
    const itemTypeMap = new Map();

    data.forEach(item => {
        if (item.itemCategoryType && item.itemCategoryType.name) {
            const category = item.itemCategoryType.name;
            categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
        }
        if (item.itemType && item.itemType.name) {
            const itemType = item.itemType.name;
            itemTypeMap.set(itemType, (itemTypeMap.get(itemType) || 0) + 1);
        }
    });

    const uniqueCategories = Array.from(categoryMap, ([name, count]) => ({ name, count }));
    const uniqueItemTypes = Array.from(itemTypeMap, ([name, count]) => ({ name, count }));

    const totalCategoryCount = uniqueCategories.reduce((total, category) => total + category.count, 0);
    const totalItemTypeCount = uniqueItemTypes.reduce((total, itemType) => total + itemType.count, 0);

    // uniqueCategories.unshift({ name: 'All', count: totalCategoryCount });
    uniqueItemTypes.unshift({ name: 'All', count: totalItemTypeCount });

    return {
        uniqueCategories,
        uniqueItemTypes
    };
};
