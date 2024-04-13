import { useNavigate } from 'react-router-dom';

export const Detail = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    
    return (
        <div>
            <span onClick={handleGoBack}>Volver</span>
            <h1>Detail</h1>
        </div>
    );
};
