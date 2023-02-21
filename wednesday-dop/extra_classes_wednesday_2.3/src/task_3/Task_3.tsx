import React, {ChangeEvent, ReactNode, useState} from 'react';
import {SlowComponent} from './slowComponent/SlowComponent';


//find the problem and fix it as part of composition optimization, memo, children

//1 - composition optimization
// export const Task_3 = () => {
//     console.log('task')
//     return (
//         <div>
//             <div>Lags when change value</div>
//             <Input/>
//             <SlowComponent/>
//         </div>
//     );
// };
// export const Input = () => {
//     console.log('input')
//     const [value, setValue] = useState('');
//     const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);
//     return (
//         <input type="text" value={value} onChange={onChange}/>
//     )
// }


//2 - memo
// export const Task_3 = () => {
//     console.log('task')
//     const [value, setValue] = useState('');
//
//     const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);
//
//     return (
//         <div>
//             <div>Lags when change value</div>
//             <input type="text" value={value} onChange={onChange} />
//             <SlowComponent/>
//         </div>
//     );
// };


//3 - children
type PropsType = {
    children: ReactNode
}

export const Task_3: React.FC<PropsType> = ({children}) => {
    console.log('task')
    const [value, setValue] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    return (
        <div>
            <div>Lags when change value</div>
            <input type="text" value={value} onChange={onChange} />
            {children}
        </div>
    );
};