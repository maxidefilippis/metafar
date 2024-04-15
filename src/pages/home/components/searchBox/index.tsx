import { SearcIcon } from '../../../../components/icons/searchIcon';
import { InputText } from '../../../../components/input';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setFilteredActions, setSearch } from '../../../../redux/reducers/stockSlice';
import styles from './index.module.css';

export const SearchBox = () => {
    const { search, actions } = useAppSelector((store) => store.stock);
    const dispatch = useAppDispatch();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        dispatch(setSearch(search));

        if (search) {
            const actionsFiltered = actions.filter((action) => {
                const searchMatchesName = action.name.toLowerCase().includes(search.toLowerCase());
                const searchMatchesSymbol = action.symbol.toLocaleLowerCase().includes(search.toLowerCase());
                return searchMatchesName || searchMatchesSymbol;
            });
            dispatch(setFilteredActions(actionsFiltered));
        } else {
            dispatch(setFilteredActions([]));
        }
    };

    return (
        <div className={styles.searchBox}>
            <SearcIcon size={20} />
            <InputText value={search} onChange={(e) => handleFilterChange(e)} />
        </div>
    );
};
