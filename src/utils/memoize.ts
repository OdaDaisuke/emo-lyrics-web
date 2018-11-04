import * as memoizee from "memoizee"

// Memoize デコレータ
export const Memoize: MethodDecorator = <T>(
    _target: Object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T> => {
    if (descriptor.value) {
        descriptor.value = memoizee(descriptor.value as any)
    }
    return descriptor
}
