import {Connection} from 'mongoose';

declare global{
    var mongoose : {
        connection: Connection | null;
        promise : Promise<Connection> | null; 
    }
}

export {} // This is necessary to avoid TS error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations."