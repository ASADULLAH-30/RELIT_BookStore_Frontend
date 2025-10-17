import React from 'react';
import { useAuth } from "../../context/AuthContext";
import { useGetOrdersByEmailQuery } from '../../redux/Features/Orders/orderApi';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';

const OrderPage = () => {
  const { currentUser } = useAuth();
  const email = currentUser?.email;
  const { data, isLoading, error } = useGetOrdersByEmailQuery(email, { skip: !email });
  const orders = data || [];

  if (!email) return (
    <div className="flex justify-center items-center min-h-screen">
      <Alert severity="info" className="w-full max-w-md">
        Please log in to view your orders.
      </Alert>
    </div>
  );
  
  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <CircularProgress />
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <Alert severity="error" className="w-full max-w-md">
        Error getting order details
      </Alert>
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <Typography variant="h4" component="h2" className="font-light mb-6 text-gray-800">
        Your Orders
      </Typography>
      
      {orders.length === 0 ? (
        <Card className="shadow-md rounded-lg">
          <CardContent className="p-6 text-center">
            <Typography variant="h6" color="textSecondary">
              No orders yet
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <Card key={order._id || index} className="shadow-md rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <Box className="bg-gray-50 p-4 border-b">
                  <Typography variant="h6" className="font-medium text-gray-700">
                    Order #{index + 1}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="mt-1">
                    Order ID: {order?._id}
                  </Typography>
                </Box>
                
                <Box className="p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography variant="subtitle2" className="text-gray-600 font-medium">
                        Customer Information
                      </Typography>
                      <Typography variant="body2" className="mt-1">
                        {order.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {order.email}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {order.phone}
                      </Typography>
                    </div>
                    
                    <div>
                      <Typography variant="subtitle2" className="text-gray-600 font-medium">
                        Shipping Address
                      </Typography>
                      <Typography variant="body2" className="mt-1">
                        {order.address?.city}, {order.address?.state}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {order.address?.country} - {order.address?.zipcode}
                      </Typography>
                    </div>
                  </div>
                  
                  <Divider className="my-2" />
                  
                  <div className="flex justify-between items-center">
                    <Typography variant="subtitle2" className="text-gray-600 font-medium">
                      Total Amount
                    </Typography>
                    <Typography variant="h6" className="font-medium text-gray-800">
                      ${order.totalPrices}
                    </Typography>
                  </div>
                  
                  <Divider className="my-2" />
                  
                  <div>
                    <Typography variant="subtitle2" className="text-gray-600 font-medium mb-2">
                      Products
                    </Typography>
                    {/* Product details would go here */}
                  </div>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;