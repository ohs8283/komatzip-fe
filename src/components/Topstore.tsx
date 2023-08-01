import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface StoreData {
  uuid: string;
  name: string;
  category: number;
  description: string;
  location: string;
  coordinates: number[];
  representImage: string;
  tags: string[];
  startTime: string;
  endTime: string;
}

const TopStore = () => {
  const [topStore, setTopStore] = useState<StoreData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<StoreData[]>(
          'https://api.to1step.shop/v1/rank',
        );
        setTopStore(response.data[0]); // 순위 1등 매장 정보 저장
      } catch (error) {
        console.log('API 호출 중 에러 :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {topStore ? (
        <div>
          <h1 className="text-3xl font-bold mb-2">이번주 Top 매장</h1>
          <div>
            <h2 className="text-lg font-bold">{topStore.name}</h2>
            <p className="text-sm">{topStore.description}</p>
            <p className="text-sm">{topStore.location}</p>
          </div>
        </div>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default TopStore;
