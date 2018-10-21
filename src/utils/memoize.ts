import * as memoizee from "memoizee"

// Memoize デコレータ
export const Memoize: MethodDecorator = <T>(
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T> => {
    if (descriptor.value) {
        descriptor.value = memoizee(descriptor.value as any)
    }
    return descriptor
}
