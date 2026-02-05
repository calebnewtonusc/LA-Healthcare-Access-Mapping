"""
Setup script for LA Healthcare Access Mapping project.

Install in development mode with:
    pip install -e .

Install for production:
    pip install .
"""

from setuptools import setup, find_packages
from pathlib import Path

# Read README for long description
readme_path = Path(__file__).parent / 'README.md'
long_description = readme_path.read_text(encoding='utf-8') if readme_path.exists() else ''

# Read requirements
requirements_path = Path(__file__).parent / 'requirements.txt'
requirements = []
if requirements_path.exists():
    requirements = [
        line.strip()
        for line in requirements_path.read_text().splitlines()
        if line.strip() and not line.startswith('#')
    ]

setup(
    name='la-healthcare-access-mapping',
    version='1.1.0',
    description='Mapping healthcare access gaps across Los Angeles County with comprehensive policy impact tools',
    long_description=long_description,
    long_description_content_type='text/markdown',
    author='LA Healthcare Access Mapping Team',
    author_email='your.email@example.com',  # Update with your email
    url='https://github.com/YOUR_USERNAME/la-healthcare-access-mapping',
    project_urls={
        'Documentation': 'https://github.com/YOUR_USERNAME/la-healthcare-access-mapping/tree/main/docs',
        'Source': 'https://github.com/YOUR_USERNAME/la-healthcare-access-mapping',
        'Tracker': 'https://github.com/YOUR_USERNAME/la-healthcare-access-mapping/issues',
    },
    packages=find_packages(where='src'),
    package_dir={'': 'src'},
    python_requires='>=3.8',
    install_requires=requirements,
    extras_require={
        'dev': [
            'pytest>=7.0.0',
            'pytest-cov>=4.0.0',
            'black>=23.0.0',
            'mypy>=1.0.0',
            'flake8>=6.0.0',
            'ipykernel>=6.0.0',
        ],
        'docs': [
            'sphinx>=5.0.0',
            'sphinx-rtd-theme>=1.0.0',
        ],
    },
    entry_points={
        'console_scripts': [
            'la-healthcare-collect-facilities=data_collection.fetch_facilities:main',
            'la-healthcare-collect-census=data_collection.fetch_census_data:main',
            'la-healthcare-merge-census=data_processing.fix_census_merge:main',
            'la-healthcare-policy-recommendations=impact.policy_recommendations:main',
            'la-healthcare-generate-impact-package=impact.generate_all_outputs:main',
        ],
    },
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Science/Research',
        'Intended Audience :: Healthcare Industry',
        'Topic :: Scientific/Engineering :: GIS',
        'Topic :: Scientific/Engineering :: Information Analysis',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
        'Programming Language :: Python :: 3.12',
        'Programming Language :: Python :: 3.13',
        'Operating System :: OS Independent',
    ],
    keywords='healthcare, access, GIS, geospatial, census, public-health, Los-Angeles',
    include_package_data=True,
    zip_safe=False,
)
