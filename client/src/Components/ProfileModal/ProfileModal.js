import { Modal, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';
import './ProfileModal.css';

function ProfileModal({ modalOpened, setModalOpened, data, editMode }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData);

  // Synchronize form data when user data changes (important for sidebar sync)
  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = { ...formData };

    if (profileImage) {
      const data = new FormData();
      data.append("file", profileImage);
      try {
        const uploadedUrl = await dispatch(uploadImage(data));
        UserData.profilePicture = uploadedUrl;
      } catch (e) { console.log(e) }
    }

    if (coverImage) {
      const data = new FormData();
      data.append("file", coverImage);
      try {
        const uploadedUrl = await dispatch(uploadImage(data));
        UserData.coverPicture = uploadedUrl;
      } catch (e) { console.log(e) }
    }

    dispatch(updateUser(user._id, UserData));
    setModalOpened(false);
  }

  // Determine which sections to show
  const showName = editMode === "name" || editMode === "all" || !editMode;
  const showJob = editMode === "job" || editMode === "all" || !editMode;
  const showLocation = editMode === "location" || editMode === "all" || !editMode;
  const showStatus = editMode === "status" || editMode === "all" || !editMode;
  const showImages = editMode === "all" || !editMode;

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      size={isMobile ? "100%" : "55%"}
      fullScreen={isMobile}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      styles={{
        content: {
          backgroundColor: '#0F111A',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1.5rem',
        },
        header: {
          backgroundColor: 'transparent',
        },
        title: {
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '1.4rem',
        },
        close: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      }}
      title={editMode ? `Update ${editMode.charAt(0).toUpperCase() + editMode.slice(1)}` : "Update Profile"}
    >
      <form className='infoForm'>
        <h3>{editMode ? `Edit Your ${editMode.charAt(0).toUpperCase() + editMode.slice(1)}` : "Update Your Info"}</h3>

        {showName && (
          <div>
            <input type="text" placeholder='First Name' className='infoInput' name="firstname"
              onChange={handleChange} value={formData.firstname} />
            <input type="text" placeholder='Last Name' className='infoInput' name="lastname"
              onChange={handleChange} value={formData.lastname} />
          </div>
        )}

        {showJob && (
          <div>
            <input type="text" placeholder='Works At' className='infoInput' name="worksAt"
              onChange={handleChange} value={formData.worksAt} />
          </div>
        )}

        {showLocation && (
          <div>
            <input type="text" placeholder='Lives in' className='infoInput' name="livesin"
              onChange={handleChange} value={formData.livesin} />
            <input type="text" placeholder='Country' className='infoInput' name="country"
              onChange={handleChange} value={formData.country} />
          </div>
        )}

        {showStatus && (
          <>
            <div>
              <input type="text" placeholder='Bio / About Me' className='infoInput' name="about"
                onChange={handleChange} value={formData.about || ''} />
            </div>
            <div>
              <input type="text" placeholder='RelationShip Status' className='infoInput' name="relationship"
                onChange={handleChange} value={formData.relationship || ''} />
            </div>
          </>
        )}

        {showImages && (
          <div>
            <label className="file-upload-label">
              <span>Update Profile Picture</span>
              <input type="file" name='profileImage' onChange={onImageChange} style={{ display: 'none' }} />
            </label>
            <label className="file-upload-label">
              <span>Update Cover Photo</span>
              <input type="file" name='coverImage' onChange={onImageChange} style={{ display: 'none' }} />
            </label>
          </div>
        )}

        <button className='button infoButton' onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
