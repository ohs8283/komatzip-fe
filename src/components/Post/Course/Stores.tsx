import { useEffect, useState } from 'react';
import axiosInstance from '../../../api/apiInstance';

// 각 가게 UUID를 가게 이름으로 변환하는 컴포넌트
const mapStoresToNames = async (storeIds: string[]) => {
  const storeNames = [];

  for (const storeUUID of storeIds) {
    // `v1/stores/{storeUUID}`
    try {
      const response = await axiosInstance.get(`v1/stores/${storeUUID}`);
      const storeData = response.data;

      // 가게 이름을 추출하여 배열에 추가
      const storeName = storeData.name;
      storeNames.push(storeName);
    } catch (error) {
      console.log('가게 이름을 추출하여 배열에 추가 중에 에러 발생: ${error}');
    }
  }
  return storeNames;
};

interface StoresProps {
  stores: string[];
}

const Stores = ({ stores }: StoresProps) => {
  const [storeNames, setStoreNames] = useState<string[]>([]);

  useEffect(() => {
    // 가게 UUID를 이름으로 변환
    mapStoresToNames(stores)
      .then((names) => setStoreNames(names))
      .catch((error) => console.log('가게 이름으로 변환 중 에러 발생:', error));
  }, [stores]);

  return (
    <div>
      <p>
        {storeNames.map((name, uuid) => (
          <span key={`post-stores-${uuid}`} className="text-[20px]">
            {name}
            {uuid !== storeNames.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Stores;
