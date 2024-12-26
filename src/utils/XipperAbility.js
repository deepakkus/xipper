import permissions from "./permissions";

class XipperAbility {
    static hasAccess(permission, role ,accessList=[]) {

        if (accessList.includes(permission)) 
            return true;

        return permissions[permission][role] || false

    }

}

export default XipperAbility