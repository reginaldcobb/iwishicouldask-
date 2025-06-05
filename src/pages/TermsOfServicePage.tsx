import React from 'react';
import { Box, Container, Typography, Paper, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Terms of Service</Typography>
        </Breadcrumbs>

        <Typography variant="h3" component="h1" gutterBottom>
          Terms of Service
        </Typography>

        <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Last Updated: June 4, 2025
          </Typography>

          <Typography variant="body1" paragraph>
            Welcome to "I Wish I Could Ask..." These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Services"). Please read these Terms carefully before using our Services.
          </Typography>

          <Typography variant="body1" paragraph>
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            1. Account Registration and Security
          </Typography>

          <Typography variant="body1" paragraph>
            To access certain features of our Services, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself. You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </Typography>

          <Typography variant="body1" paragraph>
            We reserve the right to disable any user account if, in our opinion, you have violated any provision of these Terms.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            2. User Content
          </Typography>

          <Typography variant="body1" paragraph>
            Our Services allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post on or through our Services, including its legality, reliability, and appropriateness.
          </Typography>

          <Typography variant="body1" paragraph>
            By posting User Content on or through our Services, you represent and warrant that:
          </Typography>

          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>You own or have the necessary rights to use and authorize us to use all intellectual property rights in and to any User Content.</li>
            <li>The posting of your User Content on or through our Services does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person or entity.</li>
            <li>Your User Content does not contain any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable.</li>
          </Typography>

          <Typography variant="body1" paragraph>
            We reserve the right to remove any User Content that violates these Terms or that we find objectionable for any reason, without prior notice.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            3. Intellectual Property Rights
          </Typography>

          <Typography variant="body1" paragraph>
            The Services and their original content (excluding User Content), features, and functionality are and will remain the exclusive property of "I Wish I Could Ask..." and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
          </Typography>

          <Typography variant="body1" paragraph>
            You retain any and all of your rights to any User Content you submit, post, or display on or through the Services, and you are responsible for protecting those rights. We take no responsibility and assume no liability for User Content you or any third party posts on or through the Services.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            4. Prohibited Uses
          </Typography>

          <Typography variant="body1" paragraph>
            You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services:
          </Typography>

          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services, or which may harm the Company or users of the Services.</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            5. Termination
          </Typography>

          <Typography variant="body1" paragraph>
            We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </Typography>

          <Typography variant="body1" paragraph>
            If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            6. Limitation of Liability
          </Typography>

          <Typography variant="body1" paragraph>
            In no event shall "I Wish I Could Ask...", nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </Typography>

          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Your access to or use of or inability to access or use the Services;</li>
            <li>Any conduct or content of any third party on the Services;</li>
            <li>Any content obtained from the Services; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            7. Disclaimer
          </Typography>

          <Typography variant="body1" paragraph>
            Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. The Services are provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            8. Governing Law
          </Typography>

          <Typography variant="body1" paragraph>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            9. Changes to Terms
          </Typography>

          <Typography variant="body1" paragraph>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            10. Contact Us
          </Typography>

          <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at:
          </Typography>

          <Typography variant="body1" paragraph>
            Email: legal@iwishicouldask.com<br />
            Phone: (555) 123-4567<br />
            Address: 123 Question Lane, Knowledge City, KN 12345
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default TermsOfServicePage;
