interface Item {
    label: string;
}

const WeaponItemTypes = [
    {label: "Gun", maxUses: 100, maxPower: 3},
    {label: "Stick", maxUses: 500, maxPower: 5}
];
class WeaponItem implements Item {
    uses: number;
    power: number;
    label: string;
    
    constructor() {
        let type = WeaponItemTypes[Math.round(WeaponItemTypes.length*Math.random())];

        this.uses = Math.round(Math.max(type.maxUses/5, type.maxUses*Math.random()));
        this.power = Math.round(Math.max(type.maxPower/5, type.maxPower*Math.random()));
        this.label = `${type.label} Lvl ${this.power}`;
    }
}

interface InventoryIterable {
    MAX_ITEMS: number;
    items: Item[];
    getIterator: () => InventoryIterator;
}

class WeaponInventoryInterable implements InventoryIterable {
    MAX_ITEMS = 5;
    items: WeaponItem[];
    
    constructor() {
        while (this.items.length < this.MAX_ITEMS)
            this.items.push(new WeaponItem());
    }
    
    getIterator = function() {
        return new WeaponInventoryIterator(this);
    };
}

interface InventoryIterator {
    inventory: InventoryIterable;
    index: number;
    isDone: () => boolean;
    next: () => void;
    current: () => Item;
};

class WeaponInventoryIterator implements InventoryIterator {
    inventory: WeaponInventoryInterable;
    index = 0;

    constructor (inventory: WeaponInventoryInterable) {
        this.inventory = inventory;
    }

    isDone() {return this.index == this.inventory.items.length};
    next() {this.index++};
    current() {return this.inventory[this.index]};
}
