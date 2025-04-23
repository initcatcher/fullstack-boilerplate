import React from 'react';

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">React + Spring Boot Todo 앱</h1>
      <p className="mb-8 text-lg">간단한 할 일 관리 애플리케이션입니다.</p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">주요 기능</h2>
        <ul className="text-left list-disc list-inside mb-4">
          <li className="text-black">할 일 추가하기</li>
          <li className="text-black">할 일 완료 체크하기</li>
          <li className="text-black">할 일 삭제하기</li>
        </ul>
      </div>
      
      <a 
        href="/todos" 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        할 일 관리하러 가기
      </a>
    </div>
  );
}
