export default class RG {
    public valorrg: string; // Número do RG
    public dataEmissaorg: Date; // Data de emissão do RG
    dataEmissaoRG: string | number | readonly string[] | undefined;

    constructor(valorrg: string, dataEmissaorg: Date) {
        // Inicializa as propriedades do RG
        this.valorrg = valorrg;
        this.dataEmissaorg = dataEmissaorg;
    }

    // Retorna o valor (número) do RG
    public get getValorrg(): string {
        return this.valorrg;
    }

    // Retorna a data de emissão do RG
    public get getDataEmissaorg(): Date {
        return this.dataEmissaorg;
    }
}
