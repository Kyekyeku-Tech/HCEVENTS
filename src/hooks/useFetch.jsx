import { useEffect, useState } from "react";
import { getAll, getOne } from "../firebase/firestore";

/**
 * useFetch
 *
 * @param {string} collectionName
 * @param {object} options
 *  - id (optional) → fetch single document
 *  - orderBy
 *  - direction
 *
 * @returns { data, loading, error }
 */
export default function useFetch(collectionName, options = {}) {
  const [data, setData] = useState(options.id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        let result;

        if (options.id) {
          result = await getOne(collectionName, options.id);
        } else {
          result = await getAll(collectionName, {
            orderBy: options.orderBy,
            direction: options.direction,
          });
        }

        if (mounted) {
          setData(result);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [collectionName, options.id, options.orderBy, options.direction]);

  return { data, loading, error };
}
