### About colons (:)
Both in JavaScript and TypeScript, colons are used in object notations to represent properties e.g.
```javascript
const Items = [
    {label: "Gun", maxUses: 100, maxPower: 3},
    {label: "Stick", maxUses: 500, maxPower: 5}
];
```
...but they're also used to specify variable types in TypeScript e.g.
```typescript
interface Item {
    uses: number;
    power: number;
    label: string;
}
```
