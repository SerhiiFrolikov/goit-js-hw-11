import axios from "axios";

export { getImagesByQuery };

    async function getImagesByQuery(images, page = 1) {
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '35924234-44493516fdb12d86b8db123fd';
         try {
             const responce = await axios.get(
                 `${BASE_URL}?key=${API_KEY}&q=${images}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
             );
             console.log(responce);
            return responce.data;
        } catch (e) {
             console.log(error);
        }
    }

