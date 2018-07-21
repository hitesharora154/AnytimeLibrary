export class ConfigModel {
    key: string;
    value: string;
    label: string;

    constructor(key, value, label) {
        this.key = key;
        this.value = value;
        this.label = label;
    }
}
