import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import ApiCall from './apiCollection/ApiCall';

const OrderList = () => {
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastPage, setLastPage] = useState(null);
    const loader = useRef(null);

    const fetchMenuData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(lastPage);
            setMenuData(prevData => [...prevData, ...response.data.data]);
            setLastPage(response.data.next_page_url);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }

        function handleObserver(entities) {
            const target = entities[0];
            if (target.isIntersecting) {   
                if (lastPage && !loading) {
                    fetchMenuData();
                }
            }
        }

        return () => observer.disconnect();
    }, [lastPage, loading]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiCall.baseUrl}food/datatable?page=1&per_page=10`);
                setMenuData(response.data.data);
                setLastPage(response.data.next_page_url);
            } catch (error) {
                console.error('Error fetching initial menu data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h6" component="h6" gutterBottom>
                {menuData.length} Menus
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Card style={{ height: '600px', overflowY: 'auto', padding: '10px', scrollbarWidth: 'thin' }}>
                        {menuData.slice(0, 3).map((menuItem, index) => (
                            <Card key={index} style={{ marginBottom: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {'Table ' + (index + 1)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card style={{ height: '600px', overflowY: 'auto', padding: '10px', scrollbarColor: 'white', scrollbarWidth: 'thin' }}>
                        {menuData.map((menuItem) => (
                            <Card key={menuItem.id} style={{ marginBottom: '10px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <img src={menuItem.image} alt={menuItem.name} style={{ width: '100%', height: 'auto' }} />
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography variant="h6" component="h2">
                                                {menuItem.name}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {menuItem.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                        {loading && <Typography>Loading...</Typography>}
                        <div ref={loader} />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderList;