import React from 'react';
import { Box, Container, Typography, Paper, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>

        <Typography variant="h3" component="h1" gutterBottom>
          Privacy Policy
        </Typography>

        <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Last Updated: June 4, 2025
          </Typography>

          <Typography variant="body1" paragraph>
            Welcome to "I Wish I Could Ask..." ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            1. Information We Collect
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Personal Information:</strong> When you register for an account, we collect your name, email address, username, and password. If you choose to provide it, we may also collect your profile picture and biographical information.
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Usage Information:</strong> We collect information about how you interact with our website, including the questions you ask, answers you provide, entities you follow, and content you engage with.
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Technical Information:</strong> We automatically collect certain information when you visit our website, such as your IP address, browser type, device information, operating system, and cookies.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            2. How We Use Your Information
          </Typography>

          <Typography variant="body1" paragraph>
            We use the information we collect to:
          </Typography>

          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Provide, maintain, and improve our services</li>
            <li>Process and complete transactions</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Develop new products and services</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize your experience by providing content or features that match your profile or interests</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            3. Information Sharing and Disclosure
          </Typography>

          <Typography variant="body1" paragraph>
            We may share your information with:
          </Typography>

          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Service providers who perform services on our behalf</li>
            <li>Other users, when you post questions, answers, or comments (your username and profile information will be visible)</li>
            <li>Legal authorities when required by law or to protect our rights</li>
            <li>Business partners in connection with offers, promotions, or other events</li>
            <li>Other parties in connection with a company transaction, such as a merger, sale of company assets, financing, or acquisition</li>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            4. Your Choices
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Account Information:</strong> You can update, correct, or delete your account information at any time by logging into your account settings. You may also contact us directly to request access to, correction of, or deletion of personal information that you have provided to us.
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Cookies:</strong> Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our services.
          </Typography>

          <Typography variant="body1" paragraph>
            <strong>Promotional Communications:</strong> You can opt out of receiving promotional emails from us by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            5. Data Security
          </Typography>

          <Typography variant="body1" paragraph>
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            6. Children's Privacy
          </Typography>

          <Typography variant="body1" paragraph>
            Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            7. Changes to this Privacy Policy
          </Typography>

          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through a notice on our website prior to the change becoming effective. We encourage you to periodically review this page for the latest information on our privacy practices.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            8. Contact Us
          </Typography>

          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, please contact us at:
          </Typography>

          <Typography variant="body1" paragraph>
            Email: privacy@iwishicouldask.com<br />
            Phone: (555) 123-4567<br />
            Address: 123 Question Lane, Knowledge City, KN 12345
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;
