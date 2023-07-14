/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { GENERIC_ERROR } from "../config/Config";

export function ErrorHandler(
    _target: unknown,
    _key: string,
    descriptor: PropertyDescriptor
) {
    const original = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
        try {
            const result = await original.apply(this, args);
            return result;
        } catch (error) {
            console.error(GENERIC_ERROR, error);
        }
    };
}