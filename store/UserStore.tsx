import { ReactElement, createContext, useReducer } from "react";

export enum UserActionType {
    LOGAR, DESLOGAR
};

interface UserReducerAction {
    type: UserActionType,
    user: User
};

interface User {
    email: string,
    password: string,
    token: string,
    status: boolean,
    message: string,
};
export const UserContext = createContext<User | null>(null);

export const UserDispatchContext = createContext<any>(null);

export default function UserProvider({ children }: { children: ReactElement }) {

    const [user, dispatch] = useReducer(UserReducer, initialUser);

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
};

function UserReducer(user: User, { type, user: userAuth }: UserReducerAction) {
    switch (type) {
        case UserActionType.LOGAR: {
            return {
                ...userAuth,
                status: true,
                message: 'Usuario Logado.',
            };
        }
        case UserActionType.DESLOGAR: {
            const { email, password } = user;
            return {
                email,
                password,
                token: null,
                status: false,
                message: null,
            };
        }
        default: {
            throw Error('Não foi possivel realizar operação.');
        }
    }
}

const initialUser: User = {
    email: 'bruno.rssilva@al.infnet.edu.br', password: 'bruno123', token: '', status: false, message: ''
}