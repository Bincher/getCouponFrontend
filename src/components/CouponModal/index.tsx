import { ChangeEvent, useState } from "react";
import './style.css'
import { Coupon } from "../../types/interface";
import { fileUploadRequest } from "../../apis";

interface CouponModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (couponData: Coupon) => void;
}  

export default function CouponModal({ isOpen, onClose, onSubmit }: CouponModalProps) {
    
    // state : 쿠폰 Form 상태 //
    const [formData, setFormData] = useState<Coupon>({
        name: '',
        couponImage: null,
        amount: 0,
        startDate: '',
        endDate: ''
    });
    
    // state: 이미지 미리보기 URL 상태 //
    const [imagePreview, setImagePreview] = useState<string>('');
    
    // event handler: 입력 필드 변경 핸들러 //
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    // event handler: 이미지 업로드 핸들러 //
    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // 이미지 미리보기
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            
            // 서버에 업로드
            const uploadData = new FormData();
            uploadData.append('file', file);
            
            try {
                const url = await fileUploadRequest(uploadData);
                const updatedFormData = { ...formData, couponImage: url };
                setFormData(updatedFormData);

            } catch (error) {
                console.error('이미지 업로드 오류:', error);
                alert('이미지 업로드 중 오류가 발생했습니다.');
            }
        }
    };
    
    // event handler: form 제출 핸들러 //
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);

        setFormData({
            name: '',
            couponImage: null,
            amount: 0,
            startDate: '',
            endDate: ''
        });
        setImagePreview('');

        onClose();
    };
    
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <div className="modal-header">
                <h2>쿠폰 등록</h2>
                <span className="close-button" onClick={onClose}>&times;</span>
            </div>
            
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">쿠폰 이름</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="image">이미지 등록</label>
                    <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    />
                    {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="쿠폰 이미지 미리보기" />
                    </div>
                    )}
                </div>
                
                <div className="form-group">
                    <label htmlFor="amount">쿠폰 수량</label>
                    <input
                    type="number"
                    id="amount"
                    name="amount"
                    min="1"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="startDate">시작 날짜</label>
                    <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="endDate">종료 날짜</label>
                    <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                
                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={onClose}>취소</button>
                    <button type="submit" className="submit-button">등록</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    );
}