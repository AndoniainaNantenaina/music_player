import os

import pytest
from libs.functions import list_music_in_folder


@pytest.mark.parametrize(
    "folder_path, list_of_files, file_number",
    [
        [
            "E:\\100253\\music_player\\backend\\tests\\test_data",
            [
                "Ebuka Songs - New Generation.mp3",
                "Lauren Daigle - Hold On To Me (feat. AHI).mp3",
                "Sinach - Worthy Is the Lamb.mp3",
                "tribl - Rumors (feat. Mariah Adigun & Aaron Moses).mp3",
                "Zach Williams - Chain Breaker (Live).mp3",
            ],
            5,
        ]
    ],
    ids=["Check current folder"],
)
def test_list_music_in_folder(
    folder_path: str,
    list_of_files: list,
    file_number: int,
):
    assert len(list_music_in_folder(folder_path)) == file_number
    assert list_of_files == [
        os.path.basename(file_name) for file_name in list_music_in_folder(folder_path)
    ]
