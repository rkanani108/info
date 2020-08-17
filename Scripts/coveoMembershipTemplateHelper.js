if (typeof Coveo !== 'undefined' && Coveo != null) {
    Coveo.TemplateHelpers.registerTemplateHelper("membershipAccess", (value, options) => {
        let publicPrivilege = 'Available to general public';
        let anyMembershipPrivilege = 'Available to all paying members';
        let specificMembershipPrivilege = 'Available to paying members with appropriate membership';

        var dataAttributeNodeName = options.membershipAccessDataNodeName || "data-search-user-memberships";
        var userAuthenticatedDataNodeName = options.userAuthenticatedDataNodeName || "data-search-user-authenticated";
        var hasAccessClassName = options.accessClassName || 'no-lock';
        var noAccessClassName = options.noAccessClassName || 'lock';

        var privilege = options.itemPrivilege;
        var itemMemberships = options.itemMemberships;

        try {
            if (privilege == publicPrivilege) return hasAccessClassName;

            var userMemberships = document.querySelectorAll('[' + dataAttributeNodeName + ']')[0].getAttribute(dataAttributeNodeName).split('|');
            var authenticated = document.querySelectorAll('[' + userAuthenticatedDataNodeName + ']')[0].getAttribute(userAuthenticatedDataNodeName);
            if (privilege == anyMembershipPrivilege) {
                if (authenticated !== "True") return noAccessClassName;

                return userMemberships.length == 0 ? noAccessClassName : hasAccessClassName;
            }

            if (privilege == specificMembershipPrivilege) {
                if (authenticated !== "True") return noAccessClassName;

                return userMemberships.filter(value => -1 !== itemMemberships.indexOf(value)).length > 0 ? hasAccessClassName : noAccessClassName;
            }
        } catch (err) {
            console.log("Error rendering lock class: " + err);
        }
        return noAccessClassName
    });
}