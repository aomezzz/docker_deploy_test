import React from 'react'
import restaurantService from '../service/restaurants.service'
import Swal from 'sweetalert2';

const Card = (props) => {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const authorities = user.authorities || [];
  const showEdit = authorities.includes('ROLE_ADMIN') || authorities.includes('ROLE_MODERATOR');
  const showDelete = authorities.includes('ROLE_ADMIN');

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this restaurant? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await restaurantService.deleteRestaurantById(props.id);

        if (response.status === 200 || response.status === 204) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Restaurant deleted successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          if (props.onDelete) {
            props.onDelete(props.id);
          }
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete restaurant: ' + (response.data?.message || 'Unknown error'),
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Error deleting restaurant: ' + (error.response?.data?.message || error.message),
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  
  const handleEdit = () => {
    window.location.href = `/update-restaurant/${props.id}`;
  };
  
  return (
    <div className="card bg-gray-800 w-96 shadow-lg rounded-lg overflow-hidden">
      <figure className="h-48 max-h-48 overflow-hidden">
        <img
          src={props.imageURL || "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="}
          alt={props.name}
          className="w-full h-full max-h-48 object-cover"
        />
      </figure>
      <div className="card-body p-4 text-white">
        <h2 className="card-title text-white text-lg font-semibold mb-2">{props.name}</h2>
        <p className="text-gray-300 text-sm mb-4">{props.type}</p>
        {(showEdit || showDelete) && (
          <div className="card-actions justify-end gap-2">
            {showDelete && (
              <button 
                onClick={handleDelete}
                className="btn btn-error btn-sm px-4 py-2"
              >
                Delete
              </button>
            )}
            {showEdit && (
              <a 
                href={"/update-restaurant/" + props.id}
                className="btn btn-warning btn-sm px-4 py-2"
              >
                Edit
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;