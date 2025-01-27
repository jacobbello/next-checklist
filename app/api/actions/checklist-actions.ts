'use server';

import { revalidatePath } from "next/cache";

export interface Item {
    name: string;
    desc: string;
    status: boolean;
}

//TODO replace with database

const items = new Map<number, Item>();
items.set(1, {
    'name': 'Clean room',
    'desc': 'Wash sheets, put away clothes, take out trash.',
    'status': false,
});
items.set(2, {
    'name': 'Finish homework',
    'desc': 'Read textbook and upload notes',
    'status': true,
});
items.set(3, {
    'name': 'Work on group project',
    'desc': 'Complete documentation for my part and check in with group',
    'status': false,
});

const checklist = [1, 2, 3];

export async function getItems() {
    return Array.from(items.keys());
}

export async function getItem(id: number) : Promise<Item> {
    let item =  items.get(id);
    if (item != undefined) return item;
    throw new Error("ID not found");
}

export async function addItem(item: Item) {
    const nextId = Math.max(...Array.from(items.keys())) + 1;
    items.set(nextId, item);
    revalidatePath('actions/checklist-actions');
}

export async function deleteItem(id: number) {
    let res =  items.delete(id);
    revalidatePath('actions/checklist-actions');
    return res;
}

export async function setItemComplete(id: number, complete: boolean) {
    if (items.has(id)) {
        items.get(id)!['status'] = complete;
        revalidatePath('actions/checklist-actions');
    }
}