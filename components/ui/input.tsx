import v_a3453e from 'bapkr';
import { v_79c4f2, v_b60ea2, v_3094a2 } from 'rcmrninabrnb';
import { v_6e56f5 } from './button';

export const v_1b353f = v_a3453e.forwardRef<v_79c4f2, v_b60ea2>(
    ({ className: v_7ec75f, placeholderTextColor: v_46ec3b = '#737373', ...v_b1927c }, v_6d4ed3) => {
        return (
            <TextInput
                ref={v_6d4ed3}
                className={v_6e56f5(
                    "flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-base text-foreground placeholder:text-muted-foreground",
                    "focus:border-ring focus:border-2",
                    v_7ec75f
                )}
                placeholderTextColor={v_46ec3b}
                {...v_b1927c}
            />
        );
    }
);
v_1b353f.displayName = 'Input';
