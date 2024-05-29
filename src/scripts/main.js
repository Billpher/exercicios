const valorAnterior = document.querySelector("#valorAnt");
const valoAtual = document.querySelector("#valorAtu");
const botoes = document.querySelectorAll("#botoes button");

class Calculadora {
    constructor(valorAnterior, valoAtual) {
        this.valorAnterior = valorAnterior;
        this.valoAtual = valoAtual;
        this.contaAtual = "";
    }

    adicionarNumero(digit) {
        if (digit === "." && this.valoAtual.innerText.includes(".")) {
            return;
        }

        this.contaAtual = digit;
        this.atualizarTela();
    }

    operacoes(operation) {
        if (this.valoAtual.innerText === "" && operation !== "Limpar") {
            if (this.valorAnterior.innerText !== "") {
                this.trocarOperacao(operation);
            }
            return;
        }

        let valorOperacao;
        let anterior = +this.valorAnterior.innerText.split(" ")[0];
        let atual = +this.valoAtual.innerText;

        switch (operation) {
            case "+":
                valorOperacao = anterior + atual;
                this.atualizarTela(valorOperacao, operation, atual, anterior);
                break;
            case "-":
                valorOperacao = anterior - atual;
                this.atualizarTela(valorOperacao, operation, atual, anterior);
                break;
            case "*":
                valorOperacao = anterior * atual;
                this.atualizarTela(valorOperacao, operation, atual, anterior);
                break;
            case "/":
                valorOperacao = anterior / atual;
                this.atualizarTela(valorOperacao, operation, atual, anterior);
                break;
            case "Apagar":
                this.oparacaoApagarAtual();
                break;
            case "Limpar":
                this.operacaoLimpar();
                break;
            case "=":
                this.opercaoResultado();
                break;
            default:
                return;
        }
    }

    atualizarTela(
        valorOperacao = null,
        operation = null,
        atual = null,
        anterior = null
    ) {
        if (valorOperacao === null) {
            this.valoAtual.innerText += this.contaAtual;
        } else {
            if (anterior === 0) {
                valorOperacao = atual;
            }
            this.valorAnterior.innerText = `${valorOperacao} ${operation}`;
            this.valoAtual.innerText = "";
        }
    }

    trocarOperacao(operation) {
        const simbolos = ["*", "-", "+", "/"];

        if (!simbolos.includes(operation)) {
            return;
        }

        this.valorAnterior.innerText =
            this.valorAnterior.innerText.slice(0, -1) + operation;
    }

    oparacaoApagarAtual() {
        this.valoAtual.innerText = "";
    }

    operacaoLimpar() {
        this.valoAtual.innerText = "";
        this.valorAnterior.innerText = "";
    }

    opercaoResultado() {
        let operation = this.valorAnterior.innerText.split(" ")[1];

        this.operacoes(operation);
    }
}

const calc = new Calculadora(valorAnterior, valoAtual);

botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            console.log(value);
            calc.adicionarNumero(value);
        } else {
            calc.operacoes(value);
        }
    });
});