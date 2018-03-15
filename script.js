class Calculator {

    constructor() {
        this.number = "";
        this.operator = "";
        this.memory = [];
        this.total = "";

        this.calculation = {
            "+": (x, y) => x + y,
            "-": (x, y) => x - y,
            "/": (x, y) => x / y,
            "*": (x, y) => x * y
        }
    }

    display(what, where) {

        where.text(what);
    }

    getNumber() {

        $(".number").on("click", event => {

            this.number += $(event.currentTarget).val();

            this.display(this.number, $("#answer"));
            this.display(this.memory.join(" "), $("#history"));
        });


        $("#zeroButton").on("click", event => {

            if (this.number != "") {

                this.number += $(event.currentTarget).val();

                this.display(this.number, $("#answer"));
            } else {

                this.number += "0.";

                this.display(this.number, $("#answer"));
            }
        });


        $("#point").on("click", event => {

            if (this.number == "") {

                this.number += "0.";
                this.display(this.number, $("#answer"));
            } else if (this.number.charAt(this.number.length - 1) == "." || this.number.includes(".")) {

                this.number += "";
            } else {

                this.number += ".";
                this.display(this.number, $("#answer"));
            }

        });
    }

    getOperator() {

        $(".operator").on("click", event => {

            if (this.number != "") {

                this.memory.push(parseFloat(this.number));
                this.number = "";

                this.operator += $(event.currentTarget).val();

                this.memory.push(this.operator);
                this.operator = "";

                this.display(this.memory.join(" "), $("#history"));
                this.display(this.number, $("#answer"));
            } else if (this.memory.length >= 2) {

                this.operator += $(event.currentTarget).val();

                this.memory[this.memory.length - 1] = (this.operator.charAt(0));

                this.display(this.memory.join(" "), $("#history"));

                this.operator = "";

            }
        });
    }

    reset() {

        $("#reset").on("click", event => {

            this.memory = [];
            this.number = "";
            this.operator = "";

            this.display(this.number, $("#answer"));
            this.display(this.number, $("#history"));
        });
    }

    canc() {

        $("#canc").on("click", event => {

            this.number = "";
            this.operator = "";

            if (Number.isFinite(this.memory[this.memory.length - 1])) {

                this.number = this.memory.pop();

            } else {

                this.memory.pop();
                this.display(this.number, $("#answer"));
                this.display(this.memory.join(" "), $("#history"));
            }
        });
    }

    result() {

        $("#equalButton").on("click", event => {

            if (this.number.length > 0 && this.memory.length >= 2) {

            	this.memory.push(parseFloat(this.number));
                this.number = "";

                if ( this.memory.length % 2 == 0 && this.memory.length >3 ) {
                	console.log(this)
                	this.memory.pop();
                }
                
                this.total = this.calculation[this.memory[1]](this.memory[0], this.memory[2]);

                this.memory = [];
                this.number += this.total;

                this.display(this.number, $("#answer"));
                this.display("", $("#history"));
            }
        });
    }

    init() {
        this.getNumber();
        this.getOperator();
        this.reset();
        this.canc();
        this.result();
    }
}

let calculator = new Calculator();
calculator.init();