"use client"

import { ReactEventHandler, useEffect, useState } from "react";
import { getItem, getItems, Item } from "../api/actions/checklist-actions";

export function ChecklistItem({id}: {id: number}) {
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        async function fetchItem() {
            const item = await getItem(id);
            setItem(item);
        }
        fetchItem();
    }, [id]);

    if (!item) return <li>Loading...</li>;

    async function handleChange() {
        setItem(prev => {
            if (!prev) return prev;
            return {...prev, status: !prev.status};
        });
        if (item) item.status = !item.status;
    }

    return <li>
        <div className="border-gray-600 border">
            <input type="checkbox" checked={item.status} onChange={handleChange}/>
            <span className={item.status ? "line-through" : "font-bold"}>{item.name}</span>
            <div className="text-sm">{item.desc}</div>
        </div>
    </li>
}

export default function Checklist() {
    const [items, setItems] = useState<number[]>([]);
    useEffect(() => {
        (async () => {
            const l = await getItems();
            setItems(l);
        })();
    }, []);

    const listItems = items.map(item => {
        return <ChecklistItem key={item} id={item} />
    });
    return (
        <div className="w-fit">
            <ul>
                {listItems}
            </ul>
        </div>
    )
}