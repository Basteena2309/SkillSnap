import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CertificatePage = () => {
  const { certId } = useParams();
  const [cert, setCert] = useState(null);

  useEffect(() => {
    const fetchCert = async () => {
      const res = await axios.get(`http://localhost:3000/api/certificate/${certId}`);
      setCert(res.data.data);
    };
    fetchCert();
  }, [certId]);

  if (!cert) return <p>Loading certificate...</p>;

  return (
    <div>
      <h2>Certificate</h2>
      <p>User: {cert.userName}</p>
      <p>Lesson: {cert.lessonTitle}</p>
      <p>Score: {cert.score}</p>
      <a href={cert.certificateUrl} target="_blank">Download PDF</a>
    </div>
  );
};

export default CertificatePage;
