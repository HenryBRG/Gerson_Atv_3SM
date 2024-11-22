export default class Pet {
    // Método estático (não implementado)
    static map(arg0: (pet: any, index: any) => JSX.Element): import("react").ReactNode {
        throw new Error("Method not implemented.");
    }

    public nome: string;
    public tipo: string;
    public raca: string;
    public genero: string;

    constructor(nome: string, raca: string, genero: string, tipo: string) {
        // Inicializa as propriedades do pet
        this.nome = nome;
        this.raca = raca;
        this.genero = genero;
        this.tipo = tipo;
    }

    // Retorna o nome do pet
    public get getNome() {
        return this.nome;
    }

    // Retorna a raça do pet
    public get getRaca() {
        return this.raca;
    }

    // Retorna o gênero do pet
    public get getGenero() {
        return this.genero;
    }

    // Retorna o tipo do pet
    public get getTipo() {
        return this.tipo;
    }
}
