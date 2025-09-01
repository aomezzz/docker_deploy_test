import React from 'react'
import { useParams, useNavigate } from 'react-router'
import Navbar from '../Component/Navbar'
import ModAndAdminPage from './ModAndAdminPage.jsx'
import restaurantService from '../service/restaurants.service';
import Swal from 'sweetalert2';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = React.useState({
        title: '',
        type: '',
        img: '',
    });

    React.useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await restaurantService.getRestaurantById(id);
                const data = response.data;
                setRestaurant({
                    title: data.name || '',
                    type: data.type || '',
                    img: data.imageURL || ''
                });
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            }
        };
        
        fetchRestaurant();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant({ ...restaurant, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedRestaurant = {
            name: restaurant.title,
            type: restaurant.type,
            imageURL: restaurant.img
        };

        try {
            const response = await restaurantService.editRestaurantById(id, updatedRestaurant);

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Restaurant updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    background: '#2a2e37',
                    // color: '#ffffff',
                    confirmButtonColor: '#10b981',
                    iconColor: '#10b981'
                }).then(() => {
                    window.location.href = '/';
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update restaurant: ' + (response.data.message || 'Unknown error'),
                    icon: 'error',
                    confirmButtonText: 'OK',
                    background: '#2a2e37',
                    // color: '#ffffff',
                    confirmButtonColor: '#ef4444',
                    iconColor: '#ef4444'
                });
            }
        } catch (error) {
            console.log('Error updating restaurant:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error updating restaurant: ' + (error.response?.data?.message || error.message),
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <ModAndAdminPage>
            <div className="min-h-screen bg-base-200">
                <Navbar />
                <div className="flex flex-col items-center justify-center mt-10">
                    <h1 className="text-4xl font-bold mb-6">Update Restaurant</h1>
                    <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={restaurant.img || "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="}
                            alt="Upload"
                            className="rounded-xl w-32 h-32 object-cover"
                        />
                    </figure>
                    <div className="card-body items-center text-responsive">
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Restaurant Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name here"
                                    className="input input-bordered w-full"
                                    name="title"
                                    onChange={handleChange}
                                    value={restaurant.title}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Restaurant Details</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="ประเภทอาหาร"
                                    className="input input-bordered w-full"
                                    name="type"
                                    onChange={handleChange}
                                    value={restaurant.type}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Image Restaurant</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="URL รูปภาพ"
                                    className="input input-bordered w-full"
                                    name="img"
                                    onChange={handleChange}
                                    value={restaurant.img}
                                    required
                                />
                            </div>
                            <div className="card-actions justify-end">
                                <button type="submit" className="btn btn-primary w-full">
                                    Update Restaurant
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </ModAndAdminPage>
    )
}

export default UpdateRestaurant