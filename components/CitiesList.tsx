import { FlatList } from 'react-native';
import Cidade from "@/models/Cidade";
import { useState } from 'react';
import CitiesItemList from '@/components/CitiesItemList';

export default function CitiesList(
    props: {
        cidades: Array<Cidade> | null,
        onSelected: (cidade: Cidade) => void,
        refreshingAction: () => void;
    }) {
    const { cidades, onSelected, refreshingAction } = props;
    const [isRefreshing, setRefresing] = useState(false);
    return (
        <FlatList
            data={cidades}
            renderItem={({ item }) => <CitiesItemList item={item} onSelected={onSelected} />}
            keyExtractor={item => (item as Cidade).id.toString()}
            onRefresh={async () => {
                setRefresing(true);
                await refreshingAction();
                setRefresing(false);
            }}
            refreshing={isRefreshing}
        />
    );
};