import unittest
from unittest import mock
from unittest.mock import MagicMock, patch

from utils.saved import load_saved
from utils.models import db, Posts

# import saved, models


class SavedTests(unittest.TestCase):
    def fake_post(self):
        self.saved_mock = [Posts(image="picture", caption="no cap")]

    def test_SavedTests(self):
        with patch("saved.requests.get") as mock_requests_get:
            mock_requests_get.return_value = mock_response

        mock_response = MagicMock()
        mock_response.all.return_value = self.saved_mock

        self.assertEqual(self.saved_mock[0].image, "picture")


if __name__ == "__main__":
    unittest.main()
