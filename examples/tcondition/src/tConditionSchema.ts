// an order from a restaurant that serves pizza, beer, and salad
export type TCondition = {
    items: (ConditionItem | UnknownText)[];
};

export type ConditionItem = Ttitle | TStatus | Tcreate;

// Use this type for order items that match nothing else
export interface UnknownText {
    entity: 'unknown',
    text: string; // The text that wasn't understood
}

export type Tbase = {
    entity: "bug";
    fieldOption: "like" | "in" | "between";
}

export interface Ttitle extends Tbase  {
    fieldDisplayName: "title";
    fieldSystemName: "name";
    value?: string;
}

export interface TStatus extends Tbase  {
    fieldDisplayName: "status";
    fieldSystemName: "status";
    value:  "new" | "end" | "done";
}

export interface Tcreator extends Tbase {
    fieldDisplayName: "creator";
    fieldSystemName: "creator";
    value?: string;
}

export interface Tcreate extends Tbase {
    fieldDisplayName: "created_time";
    fieldSystemName: "created_time";
    value?: string;
}

