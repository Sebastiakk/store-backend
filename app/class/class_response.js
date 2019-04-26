class class_response {

    _200(data, menssage = 'Successful execution') {
        if (data) {
            return {
                response: true,
                code: 200,
                menssage,
                data
            };
        } else {
            return {
                response: false,
                code: 404,
                menssage: "Data not found",
                data: null
            };
        }

    }
    _204(data, menssage = 'Successful execution, No data to display') {
        if (data.length !== undefined && data.length === 0) {
            return {
                response: true,
                code: 204,
                menssage,
                data
            };
        } else {
            return {
                response: false,
                code: 404,
                menssage: "Data not found",
                data: null
            };
        }

    }

    _500(menssage = 'Execution error') {
        return {
            response: false,
            code: 500,
            menssage,
            data: null
        };
    }

    _406(menssage = 'Data not accepted') {
        return {
            response: false,
            code: 406,
            menssage,
            data: null
        };
    }
    _otro(code, menssage = null) {
        return {
            response: false,
            code,
            menssage,
            data: null
        };
    }

    _404(menssage = 'Data not found') {
        return {
            response: false,
            code: 404,
            menssage,
            data: null
        };
    }

    _403(menssage = 'You do not have authorization') {
        return {
            response: false,
            code: 403,
            menssage,
            data: null
        };
    }
}

module.exports = new class_response();